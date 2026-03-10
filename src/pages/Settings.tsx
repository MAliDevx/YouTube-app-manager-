import React, { useState } from 'react';
import { Save, Globe, Shield, MessageSquare, Share2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import toast from 'react-hot-toast';

export const Settings: React.FC = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-1">Configure your application details and policies.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Globe className="w-5 h-5" />
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appName">App Name</Label>
                <Input id="appName" defaultValue="CineAdmin Movie Streaming" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Support Email</Label>
                  <Input id="email" type="email" defaultValue="support@cineadmin.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 000-0000" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Shield className="w-5 h-5" />
                Legal & Policies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacy">Privacy Policy</Label>
                <textarea 
                  id="privacy" 
                  rows={6}
                  className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                  defaultValue="Your privacy is important to us..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <textarea 
                  id="terms" 
                  rows={6}
                  className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                  defaultValue="By using this app, you agree to..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Share2 className="w-5 h-5" />
                Social Media Links
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fb">Facebook</Label>
                <Input id="fb" placeholder="https://facebook.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tw">Twitter</Label>
                <Input id="tw" placeholder="https://twitter.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ig">Instagram</Label>
                <Input id="ig" placeholder="https://instagram.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yt">YouTube</Label>
                <Input id="yt" placeholder="https://youtube.com/..." />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Upload className="w-5 h-5" />
                App Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>App Logo</Label>
                <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer">
                  <Upload className="w-6 h-6 text-slate-400" />
                  <span className="text-xs text-slate-500">Upload Logo</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>App Icon</Label>
                <div className="w-20 h-20 mx-auto bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] text-slate-500">Icon</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full gap-2" size="lg">
            <Save className="w-4 h-4" />
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
