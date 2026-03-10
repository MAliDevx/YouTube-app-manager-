import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Calendar as CalendarIcon, Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { ads as initialAds } from '../services/mockData';
import { Advertisement } from '../types';
import toast from 'react-hot-toast';

export const Advertisements: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>(initialAds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingAd ? 'Ad updated successfully' : 'Ad added successfully');
    setIsModalOpen(false);
    setEditingAd(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      setAds(ads.filter(a => a.id !== id));
      toast.success('Ad deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Advertisements</h2>
          <p className="text-slate-500 mt-1">Manage banners, video ads, and popups.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Advertisement
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>File / Preview</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ad.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-24 h-12 bg-slate-100 rounded overflow-hidden border border-slate-200">
                      {ad.type === 'Banner' ? (
                        <img src={ad.fileUrl} alt={ad.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Megaphone className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-slate-500">
                      {ad.startDate} to {ad.endDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={ad.status === 'Active' ? 'success' : 'secondary'}>
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setEditingAd(ad);
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(ad.id)}
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
          setEditingAd(null);
        }}
        title={editingAd ? 'Edit Advertisement' : 'Add New Advertisement'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Advertisement</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="space-y-2">
            <Label htmlFor="title">Ad Title</Label>
            <Input id="title" placeholder="e.g. Summer Special" defaultValue={editingAd?.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Ad Type</Label>
            <Select id="type" defaultValue={editingAd?.type || 'Banner'}>
              <option value="Banner">Banner</option>
              <option value="Video">Video</option>
              <option value="Popup">Popup</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">File URL / Upload</Label>
            <Input id="file" placeholder="https://..." defaultValue={editingAd?.fileUrl} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Date</Label>
              <Input id="start" type="date" defaultValue={editingAd?.startDate} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Date</Label>
              <Input id="end" type="date" defaultValue={editingAd?.endDate} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" defaultValue={editingAd?.status || 'Active'}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </div>
        </form>
      </Modal>
    </div>
  );
};
