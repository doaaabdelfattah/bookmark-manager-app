"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  error?: any;
  allTags?: string[];
};

export default function TagsInput({
  value = [],
  onChange,
  error,
  allTags = [],
}: Props) {
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  const handleChange = (val: string) => {
    setInputValue(val);

    const filtered = allTags.filter(
      (tag) =>
        tag.toLowerCase().includes(val.toLowerCase()) && !value.includes(tag),
    );

    setSuggestions(filtered);
  };

  const addTag = (tag: string) => {
    onChange([...value, tag]);
    setInputValue("");
    setSuggestions([]);
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>Tags *</FieldLabel>

      {/* input container */}
      <div className="border rounded-md px-2 py-2 flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-ring">
        {/* existing tags */}
        {value.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 text-sm bg-muted rounded-md flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="text-xs"
            >
              ✕
            </button>
          </span>
        ))}

        {/* input */}
        <input
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              e.preventDefault();
              addTag(inputValue.trim());
            }
          }}
          className="flex-1 outline-none min-w-25 bg-transparent"
          placeholder="Type tag..."
        />
      </div>

      {/* suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-1 border rounded-md shadow bg-background">
          {suggestions.map((tag, i) => (
            <div
              key={i}
              className="px-3 py-2 cursor-pointer hover:bg-muted"
              onClick={() => addTag(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
