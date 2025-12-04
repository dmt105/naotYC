/**
 * Demo account selector component
 */

'use client';

import { useState } from 'react';
import { ChevronDown, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEMO_ACCOUNTS, DemoAccount } from '@/constants/demo-accounts';
import { UserRole } from '@/types/auth.types';
import { ROLE_LABELS } from '@/constants/roles';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DemoAccountSelectorProps {
  onSelectAccount: (account: DemoAccount) => void;
}

export function DemoAccountSelector({ onSelectAccount }: DemoAccountSelectorProps) {
  const [selectedAccount, setSelectedAccount] = useState<DemoAccount | null>(null);

  const handleSelect = (account: DemoAccount) => {
    setSelectedAccount(account);
    onSelectAccount(account);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Compte Démo (Test)
      </label>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between border-2 border-dashed border-gray-300 hover:border-[#010b40]"
          >
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>
                {selectedAccount
                  ? `${ROLE_LABELS[selectedAccount.role]} - ${selectedAccount.label}`
                  : 'Sélectionner un compte démo'}
              </span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[300px] bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50 max-h-[400px] overflow-y-auto"
            sideOffset={5}
            align="start"
          >
            {DEMO_ACCOUNTS.map((account) => (
              <DropdownMenu.Item
                key={account.email}
                className="flex items-start space-x-3 px-3 py-3 hover:bg-gray-100 rounded cursor-pointer focus:outline-none"
                onSelect={() => handleSelect(account)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {ROLE_LABELS[account.role]}
                    </span>
                    {selectedAccount?.email === account.email && (
                      <Check className="h-4 w-4 text-[#010b40]" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{account.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{account.email}</p>
                </div>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {selectedAccount && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Email:</strong> {selectedAccount.email}
          </p>
          <p className="text-sm text-blue-800">
            <strong>Mot de passe:</strong> {selectedAccount.password}
          </p>
        </div>
      )}
    </div>
  );
}

