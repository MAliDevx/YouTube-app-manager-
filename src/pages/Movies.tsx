import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Eye, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { movies as initialMovies, categories, languages } from '../services/mockData';
import { Movie } from '../types';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMovies = movies.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || m.categoryId === categoryFilter;
    const matchesLanguage = languageFilter === 'all' || m.languageId === languageFilter;
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesCategory && matchesLanguage && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id));
      toast.success('Movie deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Movies</h2>
          <p className="text-slate-500 mt-1">Manage your movie library and content.</p>
        </div>
        <Link to="/movies/add">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Movie
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search movies..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <Select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
              <option value="all">All Languages</option>
              {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </Select>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Movie ID</TableHead>
                <TableHead>Movie Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Release Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell className="font-mono text-xs text-slate-500">#{movie.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={movie.thumbnailImage} 
                        alt={movie.name} 
                        className="w-10 h-14 object-cover rounded shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-medium">{movie.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{categories.find(c => c.id === movie.categoryId)?.name}</TableCell>
                  <TableCell>{languages.find(l => l.id === movie.languageId)?.name}</TableCell>
                  <TableCell>{movie.releaseYear}</TableCell>
                  <TableCell>
                    <Badge variant={movie.status === 'Active' ? 'success' : 'secondary'}>
                      {movie.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Link to={`/movies/edit/${movie.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4 text-slate-500" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(movie.id)}
                      >
                        <Trash2 className="w-4 h-4 text-rose-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredMovies.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                    No movies found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-slate-500">
              Showing 1 to {filteredMovies.length} of {filteredMovies.length} entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-600 border-indigo-200">1</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
