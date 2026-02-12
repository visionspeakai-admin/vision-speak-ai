'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';
import { HeroSection } from '@/components/shared/hero-section';
import { FadeInUp } from '@/components/animations/fade-in-up';
import { MapPin, Phone, Mail, Clock, Globe, Search, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface Location {
    id: number;
    name: string;
    address: string;
    lat: string;
    lng: string;
    email: string;
    phone: string;
    meta?: {
        hours?: string;
        website?: string;
    };
}

export default function MapsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await api.get('/tools/map');
            if (response.status === 'success') {
                setLocations(response.data);
                if (response.data.length > 0) {
                    setSelectedLocation(response.data[0]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredLocations = locations.filter((loc) =>
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        loc.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <HeroSection
                badgeText="Our Presence"
                title="Find an Office Near You"
                description="Visit our global offices and experience VisionSpeakAI innovation first-hand."
                backgroundVariant="grid"
            />

            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search locations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[600px] space-y-4 pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
                                </div>
                            ) : filteredLocations.length === 0 ? (
                                <p className="text-center text-slate-500 py-12">No locations found.</p>
                            ) : (
                                filteredLocations.map((loc) => (
                                    <button
                                        key={loc.id}
                                        onClick={() => setSelectedLocation(loc)}
                                        className={`w-full text-left p-6 rounded-xl transition-all border ${selectedLocation?.id === loc.id
                                                ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <h3 className={`font-bold mb-2 ${selectedLocation?.id === loc.id ? 'text-cyan-400' : 'text-white'}`}>
                                            {loc.name}
                                        </h3>
                                        <p className="text-sm text-slate-400 flex items-start gap-2">
                                            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            {loc.address}
                                        </p>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Map & Details */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Map Placeholder */}
                        <div className="aspect-video bg-black/50 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                            </div>

                            {selectedLocation ? (
                                <div className="text-center z-10">
                                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 mx-auto mb-4 animate-bounce">
                                        <MapPin className="text-cyan-400 w-8 h-8" />
                                    </div>
                                    <p className="text-white font-bold">{selectedLocation.name}</p>
                                    <p className="text-xs text-slate-400">{selectedLocation.lat}, {selectedLocation.lng}</p>
                                    <p className="mt-4 text-[10px] text-slate-600 uppercase tracking-widest">Map Interactive View</p>
                                </div>
                            ) : (
                                <p className="text-slate-500">Select a location to view on map</p>
                            )}
                        </div>

                        {/* Selection Details */}
                        {selectedLocation && (
                            <FadeInUp>
                                <div className="glass-effect p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">{selectedLocation.name}</h2>
                                            <p className="text-slate-400 text-sm leading-relaxed">{selectedLocation.address}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-sm text-slate-300">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                                    <Phone className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                {selectedLocation.phone}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-slate-300">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                                    <Mail className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                {selectedLocation.email}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-sm text-slate-300">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                                    <Clock className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Opening Hours</p>
                                                    <p className="text-xs text-slate-400">{selectedLocation.meta?.hours || 'Mon-Fri: 9:00 AM - 6:00 PM'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-slate-300">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                                    <Globe className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Website</p>
                                                    <p className="text-xs text-slate-400">{selectedLocation.meta?.website || 'www.visionspeakai.com'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full glow-button py-3 mt-4">
                                            Get Directions
                                        </button>
                                    </div>
                                </div>
                            </FadeInUp>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
