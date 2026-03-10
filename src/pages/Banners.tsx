import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, MoveUp, MoveDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { banners as initialBanners, movies } from '../services/mockData';
import { Banner } from '../types';
import toast from 'react-hot-toast';

export const Banners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingBanner ? 'Banner updated successfully' : 'Banner added successfully');
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setBanners(banners.filter(b => b.id !== id));
      toast.success('Banner deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Banners</h2>
          <p className="text-slate-500 mt-1">Manage featured content banners for the home screen.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Banner
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Display Order</TableHead>
                <TableHead>Banner Title</TableHead>
                <TableHead>Banner Image</TableHead>
                <TableHead>Selected Movie</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell className="font-bold text-slate-400">#{banner.displayOrder}</TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell>
                    <img 
                      src={banner.image} 
                      alt={banner.title} 
                      className="w-40 h-20 object-cover rounded-lg shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  </TableCell>
                  <TableCell>{movies.find(m => m.id === banner.movieId)?.name || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <MoveUp className="w-4 h-4 text-slate-400" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoveDown className="w-4 h-4 text-slate-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setEditingBanner(banner);
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <Trash2 className="w-4 h-4 text-rose-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBanner(null);
        }}
        title={editingBanner ? 'Edit Banner' : 'Add New Banner'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Banner</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="space-y-2">
            <Label htmlFor="title">Banner Title</Label>
            <Input id="title" placeholder="e.g. Featured Movie" defaultValue={editingBanner?.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="movie">Select Movie</Label>
            <Select id="movie" defaultValue={editingBanner?.movieId || '1'}>
              {movies.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Banner Image URL</Label>
            <Input id="image" placeholder="https://..." defaultValue={editingBanner?.image} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input id="order" type="number" defaultValue={editingBanner?.displayOrder || banners.length + 1} required />
          </div>
        </form>
      </Modal>
    </div>
  );
};
