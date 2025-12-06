/**
 * Issue Reporter Utilities
 *
 * Generates structured reports of conversion issues detected during testing.
 */

import * as fs from 'fs';
import * as path from 'path';

export type IssueSeverity = 'critical' | 'major' | 'minor';

export type IssueType =
  | 'UNCONVERTED_TABLE'
  | 'LITERAL_NEWLINE'
  | 'EMPTY_VISUALIZATION'
  | 'BROKEN_FORMATTING'
  | 'MISSING_CONTENT'
  | 'TRUNCATED_CONTENT'
  | 'MISSING_ASCII_DIAGRAM';

export interface IssueLocation {
  section?: string;
  lineNumber?: number;
  selector?: string;
}

export interface ConversionIssue {
  article: string;
  type: IssueType;
  severity: IssueSeverity;
  location: IssueLocation;
  originalSnippet?: string;
  renderedSnippet?: string;
  screenshotPath?: string;
  message: string;
}

export interface ArticleSummary {
  articleId: string;
  totalIssues: number;
  critical: number;
  major: number;
  minor: number;
  issues: ConversionIssue[];
}

export interface ConversionReport {
  timestamp: string;
  totalArticles: number;
  totalIssues: number;
  criticalCount: number;
  majorCount: number;
  minorCount: number;
  articles: ArticleSummary[];
  issuesByType: Record<IssueType, number>;
}

/**
 * Severity classification for issue types
 */
export const ISSUE_SEVERITY: Record<IssueType, IssueSeverity> = {
  EMPTY_VISUALIZATION: 'critical',
  TRUNCATED_CONTENT: 'critical',
  MISSING_CONTENT: 'critical',
  UNCONVERTED_TABLE: 'major',
  LITERAL_NEWLINE: 'major',
  BROKEN_FORMATTING: 'minor',
  MISSING_ASCII_DIAGRAM: 'minor'
};

/**
 * Issue type descriptions
 */
export const ISSUE_DESCRIPTIONS: Record<IssueType, string> = {
  EMPTY_VISUALIZATION: 'Diagram container renders but is empty',
  TRUNCATED_CONTENT: 'Significant content loss (>5% missing)',
  MISSING_CONTENT: 'Content in markdown not present in rendered page',
  UNCONVERTED_TABLE: 'Raw markdown table syntax visible in output',
  LITERAL_NEWLINE: '\\n appearing as text instead of line break',
  BROKEN_FORMATTING: 'Bold/italic/code not rendered properly',
  MISSING_ASCII_DIAGRAM: 'ASCII diagram from markdown not preserved'
};

/**
 * Create a new issue object
 */
export function createIssue(
  article: string,
  type: IssueType,
  location: IssueLocation,
  message: string,
  options?: {
    originalSnippet?: string;
    renderedSnippet?: string;
    screenshotPath?: string;
  }
): ConversionIssue {
  return {
    article,
    type,
    severity: ISSUE_SEVERITY[type],
    location,
    message,
    originalSnippet: options?.originalSnippet,
    renderedSnippet: options?.renderedSnippet,
    screenshotPath: options?.screenshotPath
  };
}

/**
 * Generate a complete conversion report from collected issues
 */
export function generateReport(issues: ConversionIssue[]): ConversionReport {
  // Group issues by article
  const articleMap = new Map<string, ConversionIssue[]>();
  for (const issue of issues) {
    const existing = articleMap.get(issue.article) || [];
    existing.push(issue);
    articleMap.set(issue.article, existing);
  }

  // Build article summaries
  const articles: ArticleSummary[] = Array.from(articleMap.entries()).map(([articleId, articleIssues]) => ({
    articleId,
    totalIssues: articleIssues.length,
    critical: articleIssues.filter(i => i.severity === 'critical').length,
    major: articleIssues.filter(i => i.severity === 'major').length,
    minor: articleIssues.filter(i => i.severity === 'minor').length,
    issues: articleIssues
  }));

  // Count issues by type
  const issuesByType: Record<IssueType, number> = {
    UNCONVERTED_TABLE: 0,
    LITERAL_NEWLINE: 0,
    EMPTY_VISUALIZATION: 0,
    BROKEN_FORMATTING: 0,
    MISSING_CONTENT: 0,
    TRUNCATED_CONTENT: 0,
    MISSING_ASCII_DIAGRAM: 0
  };

  for (const issue of issues) {
    issuesByType[issue.type]++;
  }

  return {
    timestamp: new Date().toISOString(),
    totalArticles: articleMap.size,
    totalIssues: issues.length,
    criticalCount: issues.filter(i => i.severity === 'critical').length,
    majorCount: issues.filter(i => i.severity === 'major').length,
    minorCount: issues.filter(i => i.severity === 'minor').length,
    articles,
    issuesByType
  };
}

/**
 * Write report to JSON file
 */
export function writeReportFile(report: ConversionReport, outputPath: string): void {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
}

/**
 * Print summary to console
 */
export function printSummary(report: ConversionReport): void {
  console.log('\n' + '='.repeat(60));
  console.log('CONVERSION INTEGRITY TEST RESULTS');
  console.log('='.repeat(60) + '\n');

  for (const article of report.articles) {
    console.log(`Article: ${article.articleId}`);
    if (article.totalIssues === 0) {
      console.log('  \u2713 No issues detected\n');
    } else {
      for (const issue of article.issues) {
        const icon = issue.severity === 'critical' ? '\u2717' :
                    issue.severity === 'major' ? '\u26A0' : '\u2022';
        const location = issue.location.section ?
          `at section "${issue.location.section}"` :
          issue.location.lineNumber ?
            `at line ${issue.location.lineNumber}` :
            '';
        console.log(`  ${icon} ${issue.type} ${location}`);
        if (issue.renderedSnippet) {
          const snippet = issue.renderedSnippet.substring(0, 50);
          console.log(`    "${snippet}..."`);
        }
      }
      console.log('');
    }
  }

  console.log('Summary:');
  console.log(`  Total Issues: ${report.totalIssues}`);
  console.log(`  Critical: ${report.criticalCount}`);
  console.log(`  Major: ${report.majorCount}`);
  console.log(`  Minor: ${report.minorCount}`);
  console.log('');

  if (report.totalIssues > 0) {
    console.log('Issues by Type:');
    for (const [type, count] of Object.entries(report.issuesByType)) {
      if (count > 0) {
        console.log(`  ${type}: ${count}`);
      }
    }
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Format a report as markdown for documentation
 */
export function formatReportAsMarkdown(report: ConversionReport): string {
  const lines: string[] = [
    '# Conversion Integrity Report',
    '',
    `Generated: ${report.timestamp}`,
    '',
    '## Summary',
    '',
    `- **Total Articles Analyzed**: ${report.totalArticles}`,
    `- **Total Issues Found**: ${report.totalIssues}`,
    `  - Critical: ${report.criticalCount}`,
    `  - Major: ${report.majorCount}`,
    `  - Minor: ${report.minorCount}`,
    ''
  ];

  if (report.totalIssues > 0) {
    lines.push('## Issues by Type', '');
    for (const [type, count] of Object.entries(report.issuesByType)) {
      if (count > 0) {
        lines.push(`- **${type}**: ${count} - ${ISSUE_DESCRIPTIONS[type as IssueType]}`);
      }
    }
    lines.push('');
  }

  lines.push('## Article Details', '');

  for (const article of report.articles) {
    lines.push(`### ${article.articleId}`);
    lines.push('');

    if (article.totalIssues === 0) {
      lines.push(':white_check_mark: No issues detected');
    } else {
      lines.push(`Issues: ${article.totalIssues} (Critical: ${article.critical}, Major: ${article.major}, Minor: ${article.minor})`);
      lines.push('');
      lines.push('| Type | Severity | Location | Message |');
      lines.push('|------|----------|----------|---------|');

      for (const issue of article.issues) {
        const location = issue.location.section || issue.location.lineNumber?.toString() || '-';
        lines.push(`| ${issue.type} | ${issue.severity} | ${location} | ${issue.message} |`);
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Check if report has any issues above threshold severity
 */
export function hasIssuesAboveThreshold(report: ConversionReport, threshold: IssueSeverity): boolean {
  if (threshold === 'minor') {
    return report.totalIssues > 0;
  }
  if (threshold === 'major') {
    return report.criticalCount > 0 || report.majorCount > 0;
  }
  return report.criticalCount > 0;
}
