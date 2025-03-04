import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MagnifyingGlass, CaretCircleDown } from 'phosphor-react';
import '../../styles/combobox.css';

interface Option {
  key: string;
  value: string;
}

interface ComboBoxProps {
  label: string;
  placeholder: string;
  options: Option[];
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const comboboxRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm({ mode: 'onChange' });

  const searchTerm = watch('searchTerm');
  console.log('errors: ', errors)
  console.log('searchTerm: ', searchTerm)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        dropdownRef.current &&
        !comboboxRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFilteredOptions(options);
      setHighlightedIndex(-1);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.value.toLowerCase().includes(searchTerm?.toLowerCase() || '')
        )
      );
      setHighlightedIndex(0);
    }
  }, [isOpen, searchTerm, options]);

  useEffect(() => {
    register('searchTerm', {
      validate: (value) =>
        options.some((option) => option.value === value)
          ? true
          : 'No matching option found',
    });
  }, [register, options]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleOptionClick = (option: Option) => {
    setValue('searchTerm', option.value);
    setIsOpen(false);
    trigger('searchTerm');
  };
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 >= filteredOptions.length ? 0 : prev + 1
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1
      );
    }

    if ((e.key === 'Enter' || e.key === 'Tab') && highlightedIndex >= 0 && filteredOptions.length > 0) {
      e.preventDefault();
      const selectedOption = filteredOptions[highlightedIndex];
      setValue('searchTerm', selectedOption.value);
      setIsOpen(false);
      trigger('searchTerm');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="combobox">
      <label className="combobox-label">{label}</label>
      <div ref={comboboxRef} className="combobox-input-container">
        <MagnifyingGlass size={20} />
        <input
          className="combobox-input"
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          autoComplete="off"
          {...register('searchTerm')}
        />
        <CaretCircleDown
          size={20}
          onClick={() => setIsOpen(!isOpen)}
          className="combobox-icon-dropdown"
        />
      </div>
      {(isOpen && filteredOptions.length > 0) && (
        <div className="combobox-options-container" ref={dropdownRef}>
          {filteredOptions.map((option, index) => (
            <div
              key={option.key}
              className={`combobox-option ${index === highlightedIndex ? 'highlighted' : ''
                }`}
              onClick={() => {
                setValue('searchTerm', option.value);
                setIsOpen(false);
                handleOptionClick(option);
              }}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
      {errors.searchTerm && (
        <p className="error-text">{errors.searchTerm.message as string}</p>
      )}

    </form>
  );
};

export default ComboBox;
