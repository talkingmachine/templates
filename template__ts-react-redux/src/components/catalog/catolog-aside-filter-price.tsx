import { Control, useController } from 'react-hook-form';
import { useAppSelector } from '../../hooks/typed-wrappers';
import { FiltersFormInputs } from '../../types/state-types';
import { ChangeEvent, FocusEvent } from 'react';

type PriceField = {
  min: string;
  max: string;
}

type componentProps = {
  control: Control<FiltersFormInputs>;
  formChangeHandler: () => void;
}

export function CatalogAsideFilterPrice ({control, formChangeHandler}: componentProps) {

  const priceLimiters = useAppSelector((state) => state.STATES.filterPriceLimiters);
  const priceFields = {
    min: useController({
      control,
      name: 'priceMin',
      defaultValue: ['']
    }).field,
    max: useController({
      control,
      name: 'priceMax',
      defaultValue: ['']
    }).field,
  };


  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>, mode: keyof PriceField) => {
    let newValue: string | number = e.target.value;
    if (newValue === '') {
      priceFields[mode].onChange([newValue]);
      return;
    }

    if (Number(newValue)) {
      newValue = Number(newValue);
      if (newValue < 0) {
        newValue = 0;
      }
      priceFields[mode].onChange([newValue]);
    }
  };

  const priceBlurHandler = (e: FocusEvent<HTMLInputElement, Element>, mode: keyof PriceField) => {
    let newValue: string | number = e.target.value;
    if (newValue === '') {
      priceFields[mode].onChange([newValue]);
      return;
    }
    if (mode === 'min' && Number(newValue) < priceLimiters.min) {
      newValue = priceLimiters.min;
    }
    if (mode === 'min' && Number(newValue) > priceLimiters.max) {
      newValue = priceLimiters.max;
    }
    if (mode === 'min' && Number(priceFields.max.value[0]) < Number(newValue)) {
      priceFields.max.onChange([newValue]);
    }
    if (mode === 'max' && Number(newValue) > priceLimiters.max) {
      newValue = priceLimiters.max;
    }
    if (mode === 'max' && Number(newValue) < Number(priceFields.min.value[0])) {
      newValue = Number(priceFields.min.value[0]);
    }

    priceFields[mode].onChange([newValue]);
    formChangeHandler();
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              ref={priceFields.min.ref}
              value={priceFields.min.value}
              onChange={(e) => priceChangeHandler(e, 'min')}
              onBlur={(e) => priceBlurHandler(e, 'min')}
              placeholder={priceLimiters.min.toString()}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              ref={priceFields.max.ref}
              value={priceFields.max.value}
              onChange={(e) => priceChangeHandler(e, 'max')}
              onBlur={(e) => priceBlurHandler(e, 'max')}
              placeholder={priceLimiters.max.toString()}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

