import React from 'react';
import { 
  Users, 
  Film, 
  Layers, 
  Globe, 
  DollarSign, 
  Megaphone,
  TrendingUp,
  TrendingDown,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { movies, users, categories, languages, payments, ads } from '../services/mockData';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Movies', value: movies.length, icon: Film, color: 'bg-blue-500', trend: '+12%', isUp: true },
  { label: 'Total Users', value: users.length, icon: Users, color: 'bg-indigo-500', trend: '+5%', isUp: true },
  { label: 'Total Categories', value: categories.length, icon: Layers, color: 'bg-purple-500', trend: '0%', isUp: true },
  { label: 'Total Languages', value: languages.length, icon: Globe, color: 'bg-emerald-500', trend: '0%', isUp: true },
  { label: 'Total Revenue', value: `$${payments.reduce((acc, p) => acc + p.amount, 0).toFixed(2)}`, icon: DollarSign, color: 'bg-amber-500', trend: '+18%', isUp: true },
  { label: 'Total Ads', value: ads.length, icon: Megaphone, color: 'bg-rose-500', trend: '-2%', isUp: false },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Link to="/movies/add">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Movie
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("p-2 rounded-lg text-white", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.isUp ? "text-emerald-600" : "text-rose-600"
                )}>
                  {stat.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Added Movies</CardTitle>
            <Link to="/movies">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Movie Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movies.slice(0, 5).map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell className="font-medium">{movie.name}</TableCell>
                    <TableCell>{categories.find(c => c.id === movie.categoryId)?.name}</TableCell>
                    <TableCell>{languages.find(l => l.id === movie.languageId)?.name}</TableCell>
                    <TableCell>
                      <Badge variant={movie.status === 'Active' ? 'success' : 'secondary'}>
                        {movie.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Registered Users</CardTitle>
            <Link to="/users">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 5).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </TableCell>
                    <TableCell>{user.package}</TableCell>
                    <TableCell>{user.registrationDate}</TableCell>
                    <TableCell>
                      <Badge variant={user.subscriptionStatus === 'Active' ? 'success' : 'destructive'}>
                        {user.subscriptionStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper for cn in Dashboard
import { cn } from '../lib/utils';
