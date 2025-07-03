'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol } from '..';
import { Input } from '../../ui';

interface City {
  Ref: string;
  Description: string;
}

interface Street {
  Ref: string;
  Description: string;
}

interface Props {
  cityNameField: string;
  streetNameField: string;
  houseField: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const NOVA_POSHTA_API_KEY = process.env.NOVA_POSHTA_KEY;

export const FormInputAddressFull: React.FC<Props> = ({
  cityNameField,
  streetNameField,
  houseField,
  label,
  required,
  className,
}) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const cityValue = watch(cityNameField) || '';
  const streetValue = watch(streetNameField) || '';
  const houseValue = watch(houseField) || '';

  const cityError = errors[cityNameField]?.message as string;
  const streetError = errors[streetNameField]?.message as string;
  const houseError = errors[houseField]?.message as string;

  const [citySuggestions, setCitySuggestions] = useState<City[]>([]);
  const [streetSuggestions, setStreetSuggestions] = useState<Street[]>([]);

  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStreetDropdown, setShowStreetDropdown] = useState(false);

  const [selectedCityRef, setSelectedCityRef] = useState<string | null>(null);

  // Загрузка городов
  useEffect(() => {
    if (cityValue.length < 2) {
      setCitySuggestions([]);
      setShowCityDropdown(false);
      return;
    }
    const fetchCities = async () => {
      try {
        const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey: NOVA_POSHTA_API_KEY,
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {
              FindByString: cityValue,
              Limit: 10,
            },
          }),
        });
        const data = await res.json();
        if (data.success) {
          setCitySuggestions(data.data);
          setShowCityDropdown(true);
        }
      } catch {
        setCitySuggestions([]);
        setShowCityDropdown(false);
      }
    };
    fetchCities();
  }, [cityValue]);

  // Загрузка улиц по выбранному городу
  useEffect(() => {
    if (!selectedCityRef || streetValue.length < 2) {
      setStreetSuggestions([]);
      setShowStreetDropdown(false);
      return;
    }
    const fetchStreets = async () => {
      try {
        const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey: NOVA_POSHTA_API_KEY,
            modelName: 'Address',
            calledMethod: 'getStreet',
            methodProperties: {
              CityRef: selectedCityRef,
              FindByString: streetValue,
              Limit: 10,
            },
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStreetSuggestions(data.data);
          setShowStreetDropdown(true);
        }
      } catch {
        setStreetSuggestions([]);
        setShowStreetDropdown(false);
      }
    };
    fetchStreets();
  }, [selectedCityRef, streetValue]);

  const onSelectCity = (city: City) => {
    setValue(cityNameField, city.Description, { shouldValidate: true });
    setSelectedCityRef(city.Ref);
    setShowCityDropdown(false);
    // Очистить улицу при смене города
    setValue(streetNameField, '', { shouldValidate: false });
    setStreetSuggestions([]);
    setShowStreetDropdown(false);
  };

  const onSelectStreet = (street: Street) => {
    setValue(streetNameField, street.Description, { shouldValidate: true });
    setShowStreetDropdown(false);
  };

  const onClearCity = () => {
    setValue(cityNameField, '', { shouldValidate: true });
    setSelectedCityRef(null);
    setCitySuggestions([]);
    setShowCityDropdown(false);
    setValue(streetNameField, '', { shouldValidate: false });
    setStreetSuggestions([]);
    setShowStreetDropdown(false);
  };

  const onClearStreet = () => {
    setValue(streetNameField, '', { shouldValidate: true });
    setStreetSuggestions([]);
    setShowStreetDropdown(false);
  };

  const onClearHouse = () => {
    setValue(houseField, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-4">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      {/* Город */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Input
          className="h-12 text-md"
          placeholder="Город"
          value={cityValue}
          onChange={(e) => {
            setValue(cityNameField, e.target.value, { shouldValidate: false });
            setSelectedCityRef(null);
          }}
          onFocus={() => citySuggestions.length && setShowCityDropdown(true)}
          onBlur={() => setTimeout(() => setShowCityDropdown(false), 150)}
          autoComplete="off"
        />
        {cityValue && <ClearButton onClick={onClearCity} />}
        {showCityDropdown && citySuggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              background: '#fff',
              border: '1px solid #ccc',
              width: '100%',
              maxHeight: 200,
              overflowY: 'auto',
              margin: 0,
              padding: 0,
              listStyle: 'none',
              zIndex: 1000,
            }}
          >
            {citySuggestions.map((city) => (
              <li
                key={city.Ref}
                onMouseDown={() => onSelectCity(city)}
                style={{ padding: 8, cursor: 'pointer' }}
              >
                {city.Description}
              </li>
            ))}
          </ul>
        )}
        {cityError && <ErrorText text={cityError} className="mt-2" />}
      </div>

      {/* Улица */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Input
          className="h-12 text-md"
          placeholder="Улица"
          value={streetValue}
          onChange={(e) =>
            setValue(streetNameField, e.target.value, { shouldValidate: false })
          }
          onFocus={() =>
            streetSuggestions.length && setShowStreetDropdown(true)
          }
          onBlur={() => setTimeout(() => setShowStreetDropdown(false), 150)}
          autoComplete="off"
          disabled={!selectedCityRef}
        />
        {streetValue && <ClearButton onClick={onClearStreet} />}
        {showStreetDropdown && streetSuggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              background: '#fff',
              border: '1px solid #ccc',
              width: '100%',
              maxHeight: 200,
              overflowY: 'auto',
              margin: 0,
              padding: 0,
              listStyle: 'none',
              zIndex: 1000,
            }}
          >
            {streetSuggestions.map((street) => (
              <li
                key={street.Ref}
                onMouseDown={() => onSelectStreet(street)}
                style={{ padding: 8, cursor: 'pointer' }}
              >
                {street.Description}
              </li>
            ))}
          </ul>
        )}
        {streetError && <ErrorText text={streetError} className="mt-2" />}
      </div>

      {/* Дом */}
      <div style={{ position: 'relative' }}>
        <Input
          className="h-12 text-md"
          placeholder="Дом"
          value={houseValue}
          onChange={(e) =>
            setValue(houseField, e.target.value, { shouldValidate: true })
          }
          autoComplete="off"
        />
        {houseValue && <ClearButton onClick={onClearHouse} />}
        {houseError && <ErrorText text={houseError} className="mt-2" />}
      </div>
    </div>
  );
};
