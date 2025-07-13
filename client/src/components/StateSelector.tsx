import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface State {
  code: string;
  name: string;
}

interface StateSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function StateSelector({ value, onValueChange, className }: StateSelectorProps) {
  const { data: states, isLoading } = useQuery<State[]>({
    queryKey: ['/api/states'],
  });

  if (isLoading) {
    return (
      <div className={className}>
        <Label className="block text-sm font-medium text-neutral-700 mb-2">
          State/Jurisdiction
        </Label>
        <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
          Loading states...
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Label className="block text-sm font-medium text-neutral-700 mb-2">
        State/Jurisdiction
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
          <SelectValue placeholder="Select your state..." />
        </SelectTrigger>
        <SelectContent>
          {states?.map((state) => (
            <SelectItem key={state.code} value={state.code}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
