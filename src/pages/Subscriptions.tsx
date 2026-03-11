import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, Smartphone, Monitor, Tv, X, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { packages as initialPackages } from '../services/mockData';
import { SubscriptionPackage } from '../types';
import toast from 'react-hot-toast';

const emptyPackage: Partial<SubscriptionPackage> = {
  name: '',
  price: 0,
  validity: '',
  quality: 'HD',
  devicesAllowed: 1,
  description: '',
};

const qualityColors: Record<string, string> = {
  SD: 'bg-slate-100 text-slate-600',
  HD: 'bg-blue-50 text-blue-600',
  'Full HD': 'bg-indigo-50 text-indigo-600',
  '4K': 'bg-violet-50 text-violet-700',
};

const cardAccents: string[] = [
  'from-indigo-500 to-blue-500',
  'from-violet-500 to-indigo-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-rose-500 to-pink-500',
  'from-amber-500 to-orange-500',
];

export const Subscriptions: React.FC = () => {
  const [packages, setPackages] = useState<SubscriptionPackage[]>(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<SubscriptionPackage | null>(null);
  const [formData, setFormData] = useState<Partial<SubscriptionPackage>>(emptyPackage);

  const openAdd = () => {
    setFormData(emptyPackage);
    setEditingPackage(null);
    setIsModalOpen(true);
  };

  const openEdit = (pkg: SubscriptionPackage) => {
    setFormData({ ...pkg });
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
    setFormData(emptyPackage);
  };

  const handleChange = (field: keyof SubscriptionPackage, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPackage) {
      setPackages(prev =>
        prev.map(p => (p.id === editingPackage.id ? { ...editingPackage, ...formData } as SubscriptionPackage : p))
      );
      toast.success('Package updated successfully');
    } else {
      const newPkg: SubscriptionPackage = {
        ...formData,
        id: `pkg-${Date.now()}`,
      } as SubscriptionPackage;
      setPackages(prev => [...prev, newPkg]);
      toast.success('Package added successfully');
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
      toast.success('Package deleted successfully');
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Subscription Packages</h2>
          </div>
          <p className="text-slate-500 text-sm pl-12">Define and manage your pricing plans.</p>
        </div>
        <Button
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 rounded-xl px-5 py-2.5 font-semibold transition-all"
          onClick={openAdd}
        >
          <Plus className="w-4 h-4" />
          Add Package
        </Button>
      </div>

      {/* Package Cards */}
      {packages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Package className="w-7 h-7 text-slate-400" />
          </div>
          <p className="font-semibold text-slate-600 text-lg">No packages yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Package" to create your first plan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => {
            const accentClass = cardAccents[index % cardAccents.length];
            const qualityClass = qualityColors[pkg.quality] ?? 'bg-slate-100 text-slate-600';
            return (
              <div
                key={pkg.id}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${accentClass}`} />

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <button
                    onClick={() => openEdit(pkg)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-300 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Plan name + quality badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Plan</p>
                      <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${qualityClass}`}>
                      {pkg.quality}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight">${pkg.price}</span>
                      <span className="text-slate-400 text-sm mb-1.5">/ {pkg.validity}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </span>
                      {pkg.quality} Video Quality
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </span>
                      {pkg.devicesAllowed} Device{pkg.devicesAllowed !== 1 ? 's' : ''} Allowed
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </span>
                      {pkg.description}
                    </div>
                  </div>

                  {/* Device icons */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex justify-center gap-5">
                    <Smartphone className="w-4.5 h-4.5 text-slate-300" />
                    <Monitor className="w-4.5 h-4.5 text-slate-300" />
                    <Tv className="w-4.5 h-4.5 text-slate-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPackage ? 'Edit Package' : 'Add New Package'}
        footer={
          <div className="flex gap-3 w-full justify-end">
            <Button
              variant="ghost"
              onClick={closeModal}
              className="rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 px-5 font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 font-semibold shadow-md shadow-indigo-100"
            >
              {editingPackage ? 'Update Package' : 'Save Package'}
            </Button>
          </div>
        }
      >
        <form className="space-y-5" onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Package Name</Label>
              <Input
                id="name"
                placeholder="e.g. Premium"
                value={formData.name ?? ''}
                onChange={e => handleChange('name', e.target.value)}
                required
                className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-sm font-semibold text-slate-700">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="19.99"
                value={formData.price ?? ''}
                onChange={e => handleChange('price', parseFloat(e.target.value))}
                required
                className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="validity" className="text-sm font-semibold text-slate-700">Validity</Label>
              <Input
                id="validity"
                placeholder="e.g. 1 Month"
                value={formData.validity ?? ''}
                onChange={e => handleChange('validity', e.target.value)}
                required
                className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quality" className="text-sm font-semibold text-slate-700">Video Quality</Label>
              <Select
                id="quality"
                value={formData.quality ?? 'HD'}
                onChange={e => handleChange('quality', e.target.value)}
                className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
              >
                <option value="SD">SD</option>
                <option value="HD">HD</option>
                <option value="Full HD">Full HD</option>
                <option value="4K">4K</option>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="devices" className="text-sm font-semibold text-slate-700">Devices Allowed</Label>
            <Input
              id="devices"
              type="number"
              min={1}
              value={formData.devicesAllowed ?? 1}
              onChange={e => handleChange('devicesAllowed', parseInt(e.target.value))}
              required
              className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc" className="text-sm font-semibold text-slate-700">Description</Label>
            <Input
              id="desc"
              placeholder="Brief description"
              value={formData.description ?? ''}
              onChange={e => handleChange('description', e.target.value)}
              required
              className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};