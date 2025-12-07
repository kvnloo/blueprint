import React from 'react';
import { TOCItem } from './types';

interface TableOfContentsProps {
  items: TOCItem[];
  activeId: string | null;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, activeId }) => {
  if (items.length === 0) return null;

  return (
    <nav className="hidden 2xl:block fixed right-8 top-1/2 -translate-y-1/2 w-64 max-h-[60vh] overflow-y-auto">
      <div className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-4">Contents</div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                block text-sm transition-colors duration-200
                ${item.level === 1 ? 'pl-0' : 'pl-4'}
                ${activeId === item.id
                  ? 'text-teal-400 border-l-2 border-teal-400 pl-3'
                  : 'text-gray-500 hover:text-gray-300 border-l-2 border-transparent hover:border-gray-600 pl-3'
                }
              `}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
