
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, BookOpen, Layers, Zap, Search, X, Filter } from 'lucide-react';
import { researchData, ArticleTrack, ArticleType } from '../data/researchData';
import { ViewState } from '../App';

const ResearchHub = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTracks, setSelectedTracks] = useState<ArticleTrack[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ArticleType[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const trackConfig = {
    'Blueprint': { color: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-500/30', glow: 'bg-cyan-500/10', icon: Zap },
    'World Sim': { color: 'text-orange-400', bg: 'bg-orange-500', border: 'border-orange-500/30', glow: 'bg-orange-500/10', icon: Layers },
    'Evolve': { color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/30', glow: 'bg-emerald-500/10', icon: BookOpen },
  };

  const allTracks: ArticleTrack[] = ['Blueprint', 'World Sim', 'Evolve'];
  const allTypes: ArticleType[] = ['Deep Dive', 'Casual', 'Technical Guide'];

  // Filter articles based on search and filter criteria
  const filteredArticles = useMemo(() => {
    return researchData.filter(article => {
      // Search filter (title and description)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower);

      // Track filter
      const articleTracks = Array.isArray(article.track) ? article.track : [article.track];
      const matchesTrack = selectedTracks.length === 0 ||
        selectedTracks.some(track => articleTracks.includes(track));

      // Type filter
      const matchesType = selectedTypes.length === 0 ||
        selectedTypes.includes(article.type);

      return matchesSearch && matchesTrack && matchesType;
    });
  }, [searchQuery, selectedTracks, selectedTypes]);

  const toggleTrack = (track: ArticleTrack) => {
    setSelectedTracks(prev =>
      prev.includes(track)
        ? prev.filter(t => t !== track)
        : [...prev, track]
    );
  };

  const toggleType = (type: ArticleType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTracks([]);
    setSelectedTypes([]);
  };

  const hasActiveFilters = searchQuery !== '' || selectedTracks.length > 0 || selectedTypes.length > 0;

  return (
    <section className="pt-32 pb-24 px-6 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            SCIENTIFIC DEEP DIVES & GUIDES
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Research <span className="text-gray-600">Hub</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Explore our latest whitepapers on autonomous systems, biophilic design, and human performance optimization.
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <Filter size={18} />
              <span className="font-medium">Filters</span>
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-teal-500 text-white text-xs font-bold">
                  {selectedTracks.length + selectedTypes.length + (searchQuery ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1"
              >
                <X size={14} />
                Clear all
              </button>
            )}
          </div>

          {/* Filter Options Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Track Filters */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tracks</h4>
                      <div className="flex flex-wrap gap-2">
                        {allTracks.map(track => {
                          const config = trackConfig[track];
                          const Icon = config.icon;
                          const isSelected = selectedTracks.includes(track);
                          return (
                            <button
                              key={track}
                              onClick={() => toggleTrack(track)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                isSelected
                                  ? `${config.bg}/20 ${config.border} ${config.color}`
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                              }`}
                            >
                              <Icon size={14} />
                              <span className="text-sm font-medium">{track}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Type Filters */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Article Type</h4>
                      <div className="flex flex-wrap gap-2">
                        {allTypes.map(type => {
                          const isSelected = selectedTypes.includes(type);
                          return (
                            <button
                              key={type}
                              onClick={() => toggleType(type)}
                              className={`px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
                                isSelected
                                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-400'
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-500">
            {hasActiveFilters ? (
              <span>Showing {filteredArticles.length} of {researchData.length} articles</span>
            ) : (
              <span>{researchData.length} articles</span>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Search className="text-gray-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-teal-500/20 border border-teal-500/50 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredArticles.map((article, i) => {
            // Handle both single track and array of tracks
            const tracks = Array.isArray(article.track) ? article.track : [article.track];
            const primaryTrack = tracks[0];
            const config = trackConfig[primaryTrack];
            const Icon = config.icon;

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="group relative"
                onClick={() => onNavigate(`article:${article.id}`)}
              >
                {/* Card Container */}
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden">

                  {/* Track Stripe - gradient for multi-track articles */}
                  {tracks.length === 1 ? (
                    <div className={`absolute top-0 left-0 w-1 h-full ${config.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  ) : (
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-orange-500 to-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}

                  {/* Hover Glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 ${config.glow} blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Header Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
                     <div className="flex flex-wrap items-center gap-2">
                        {tracks.map((track) => {
                          const trackConf = trackConfig[track];
                          const TrackIcon = trackConf.icon;
                          return (
                            <span key={track} className={`flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border ${trackConf.border} ${trackConf.color} text-[10px] font-bold uppercase tracking-wider`}>
                              <TrackIcon size={10} /> {track}
                            </span>
                          );
                        })}
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                          {article.type}
                        </span>
                     </div>
                     <span className="flex items-center gap-1 text-xs font-mono text-gray-500">
                        <Clock size={12} /> {article.readTime}
                     </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-white transition-colors relative z-10">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-3 relative z-10 text-sm leading-relaxed">
                    {article.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between relative z-10 border-t border-white/5 pt-6">
                    <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full border border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                          z0
                       </div>
                    </div>
                    <button className={`flex items-center gap-2 text-sm font-bold text-gray-300 group-hover:${config.color} transition-colors`}>
                      Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ResearchHub;
