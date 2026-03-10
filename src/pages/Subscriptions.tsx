import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, Smartphone, Monitor, Tv } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { packages as initialPackages } from '../services/mockData';
import { SubscriptionPackage } from '../types';
import toast from 'react-hot-toast';

export const Subscriptions: React.FC = () => {
  const [packages, setPackages] = useState<SubscriptionPackage[]>(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<SubscriptionPackage | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingPackage ? 'Package updated successfully' : 'Package added successfully');
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
      toast.success('Package deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Subscription Packages</h2>
          <p className="text-slate-500 mt-1">Define and manage your pricing plans.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="relative overflow-hidden border-2 border-slate-100 hover:border-indigo-200 transition-all group">
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => {
                setEditingPackage(pkg);
                setIsModalOpen(true);
              }}>
                <Edit className="w-3 h-3" />
              </Button>
              <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(pkg.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-indigo-600">{pkg.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">${pkg.price}</span>
                <span className="text-slate-500 text-sm ml-1">/ {pkg.validity}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{pkg.quality} Video Quality</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{pkg.devicesAllowed} Devices Allowed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{pkg.description}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-center gap-6">
                <Smartphone className="w-5 h-5 text-slate-300" />
                <Monitor className="w-5 h-5 text-slate-300" />
                <Tv className="w-5 h-5 text-slate-300" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPackage(null);
        }}
        title={editingPackage ? 'Edit Package' : 'Add New Package'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Package</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Package Name</Label>
              <Input id="name" placeholder="e.g. Premium" defaultValue={editingPackage?.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" step="0.01" placeholder="19.99" defaultValue={editingPackage?.price} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validity">Validity</Label>
              <Input id="validity" placeholder="e.g. 1 Month" defaultValue={editingPackage?.validity} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quality">Video Quality</Label>
              <Select id="quality" defaultValue={editingPackage?.quality || 'HD'}>
                <option value="SD">SD</option>
                <option value="HD">HD</option>
                <option value="Full HD">Full HD</option>
                <option value="4K">4K</option>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="devices">Devices Allowed</Label>
            <Input id="devices" type="number" defaultValue={editingPackage?.devicesAllowed || 1} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Input id="desc" placeholder="Brief description" defaultValue={editingPackage?.description} required />
          </div>
        </form>
      </Modal>
    </div>
  );
};
