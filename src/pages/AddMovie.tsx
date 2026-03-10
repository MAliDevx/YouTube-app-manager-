import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, ImageIcon, Video, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { categories, languages, movies } from '../services/mockData';
import toast from 'react-hot-toast';

const movieSchema = z.object({
  name: z.string().min(2, 'Movie name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  languageId: z.string().min(1, 'Language is required'),
  releaseYear: z.number().min(1900).max(2100),
  duration: z.string().min(2, 'Duration is required'),
  trailerUrl: z.string().url().optional().or(z.literal('')),
  enableDownload: z.boolean().optional(),
  status: z.enum(['Active', 'Inactive']),
});

type MovieFormValues = z.infer<typeof movieSchema>;

export const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const movie = isEditing ? movies.find(m => m.id === id) : null;

  const { register, handleSubmit, formState: { errors } } = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: movie ? {
      name: movie.name,
      description: movie.description,
      categoryId: movie.categoryId,
      languageId: movie.languageId,
      releaseYear: movie.releaseYear,
      duration: movie.duration,
      trailerUrl: movie.trailerUrl,
      enableDownload: movie.enableDownload,
      status: movie.status,
    } : {
      status: 'Active',
      enableDownload: true,
      categoryId: categories[0]?.id || '',
      languageId: languages[0]?.id || '',
      releaseYear: new Date().getFullYear(),
    }
  });

  const [previews] = useState({
    banner: movie?.bannerImage || '',
    thumbnail: movie?.thumbnailImage || ''
  });

  const onSubmit = (data: MovieFormValues) => {
    console.log(data);
    toast.success(isEditing ? 'Movie updated successfully' : 'Movie added successfully');
    navigate('/movies');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/movies')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <p className="text-slate-500 mt-1">
            {isEditing ? 'Update movie details and media.' : 'Fill in the details to add a new movie to the library.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Movie Name</Label>
                <Input id="name" {...register('name')} placeholder="Enter movie name" />
                {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Movie Description</Label>
                <textarea 
                  id="description" 
                  {...register('description')}
                  rows={4}
                  className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                  placeholder="Enter movie description"
                />
                {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select id="category" {...register('categoryId')}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select id="language" {...register('languageId')}>
                    {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="releaseYear">Release Year</Label>
                  <Input id="releaseYear" type="number" {...register('releaseYear', { valueAsNumber: true })} placeholder="2024" />
                  {errors.releaseYear && <p className="text-xs text-rose-500">{errors.releaseYear.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" {...register('duration')} placeholder="e.g. 2h 30m" />
                  {errors.duration && <p className="text-xs text-rose-500">{errors.duration.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media & Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Upload Movie Video</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer">
                    <Video className="w-8 h-8 text-slate-400" />
                    <p className="text-sm font-medium text-slate-600">Click to upload video</p>
                    <p className="text-xs text-slate-400">MP4, MKV up to 2GB</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trailerUrl">Trailer URL</Label>
                    <Input id="trailerUrl" {...register('trailerUrl')} placeholder="YouTube or Vimeo link" />
                    {errors.trailerUrl && <p className="text-xs text-rose-500">{errors.trailerUrl.message}</p>}
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <input 
                      type="checkbox" 
                      id="enableDownload" 
                      {...register('enableDownload')}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <Label htmlFor="enableDownload" className="cursor-pointer">Enable Download</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Banner Image</Label>
                <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group">
                  {previews.banner ? (
                    <img src={previews.banner} alt="Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-xs">1200 x 600 recommended</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" type="button" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <div className="relative aspect-[2/3] w-40 mx-auto bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group">
                  {previews.thumbnail ? (
                    <img src={previews.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-xs">300 x 450</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" type="button" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select id="status" {...register('status')}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </div>
              <Button className="w-full gap-2" size="lg" type="submit">
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Movie' : 'Save Movie'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

