import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Award,
  Search,
  ExternalLink,
  Filter,
  CheckCircle2,
  Layers,
  BookOpen,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const CertificationsPage: React.FC = () => {
  const { certifications, careers, user } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'Cloud Architecture', 'Security & Compliance', 'DevOps & Containers', 'Development Tools', 'Infrastructure as Code'];

  const filtered = certifications.filter((cert) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      cert.name.toLowerCase().includes(q) ||
      cert.issuingOrganization.toLowerCase().includes(q) ||
      cert.description.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || cert.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Recognized Industry Credentials</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Industry Certifications
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Explore industry credentials recognized by technology employers to validate foundational cloud, security, and DevOps competencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent">Curated Catalog ({certifications.length} Certifications)</Badge>
        </div>
      </div>

      {/* Info notice */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          Certifications supplement practical project evidence. In tech hiring, projects demonstrate practical ability, while certifications demonstrate standardized domain fluency.
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certifications or issuers (e.g. AWS, CompTIA, Kubernetes)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131D31] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0">Category:</span>
          {categories.slice(0, 4).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cert) => {
          const isRelevantToUser = cert.relevantCareerIds.includes(user.targetCareerId);

          return (
            <Card
              key={cert.id}
              hoverEffect
              className={`flex flex-col justify-between ${
                isRelevantToUser ? 'border-indigo-300/80 dark:border-indigo-900/60' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {cert.category}
                  </span>

                  {isRelevantToUser && (
                    <Badge variant="primary" size="sm">
                      Recommended for Your Role
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                  {cert.name}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  Issued by {cert.issuingOrganization}
                </p>
              </CardHeader>

              <CardContent className="py-2 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cert.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Level:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{cert.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hiring Classification:</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{cert.classification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Prerequisites:</span>
                    <span className="text-slate-500 truncate max-w-[170px]">{cert.prerequisites}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-3">
                <a
                  href={cert.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Official Vendor Syllabus
                  </Button>
                </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

