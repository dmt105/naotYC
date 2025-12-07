"use client";

import React, { useEffect, useState } from 'react';
import { usersService } from '@/services/users.service';
import { UserProfile } from '@/types/user.types';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface RecipientSelectorProps {
  value?: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}

export function RecipientSelector({ value = [], onChange, disabled = false }: RecipientSelectorProps) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(value || []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await usersService.getUsers();
        if (!mounted) return;
        setUsers(res.data || []);
      } catch (e) {
        // ignore for now
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  const filtered = users.filter((u) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
    setSelected(next);
    onChange(next);
  };

  return (
    <div>
      <Input
        placeholder="Rechercher un destinataire (nom, email)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
      />

      <div className="mt-2 flex flex-wrap gap-2">
        {selected.map((id) => {
          const u = users.find((x) => x.id === id);
          if (!u) return null;
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={cn('inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100')}
              disabled={disabled}
            >
              <Avatar>
                {u.avatar ? (
                  <AvatarImage src={u.avatar} alt={`${u.firstName} ${u.lastName}`} />
                ) : (
                  <AvatarFallback>{(u.firstName?.[0] || '') + (u.lastName?.[0] || '')}</AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm">{u.firstName} {u.lastName}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 max-h-40 overflow-y-auto border rounded-md p-2 bg-white">
        {filtered.map((u) => (
          <div key={u.id} className="flex items-center justify-between py-1 px-2 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Avatar>
                {u.avatar ? (
                  <AvatarImage src={u.avatar} alt={`${u.firstName} ${u.lastName}`} />
                ) : (
                  <AvatarFallback>{(u.firstName?.[0] || '') + (u.lastName?.[0] || '')}</AvatarFallback>
                )}
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{u.firstName} {u.lastName}</div>
                <div className="text-xs text-gray-500">{u.email}</div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => toggle(u.id)}
                className={cn(
                  'px-3 py-1 rounded-md text-sm',
                  selected.includes(u.id) ? 'bg-[#010b40] text-white' : 'bg-gray-100'
                )}
                disabled={disabled}
              >
                {selected.includes(u.id) ? 'Sélectionné' : 'Ajouter'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
