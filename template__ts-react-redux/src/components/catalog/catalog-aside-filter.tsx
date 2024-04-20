import { useForm } from 'react-hook-form';
import { FormFilter } from '../../consts/enums';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CatalogAsideFilterPrice } from './catolog-aside-filter-price';
import { FiltersFormInputs } from '../../types/state-types';

export function CatalogAsideFilter ():JSX.Element {

  const {
    register,
    reset,
    resetField,
    watch,
    getValues,
    setValue,
    control
  } = useForm<FiltersFormInputs>();
  const [searchParams, setSearchParams] = useSearchParams();

  const formChangeHandler = () => { // when filters changed, add new param
    const values = (getValues());
    const newParams: {[key: string]: string[]} = {};

    for (const key in values) {
      const value = values[key as keyof FiltersFormInputs];
      if (value && value[0]) {
        newParams[key] = value;
      }
    }
    if (searchParams.has('sortType')) {
      newParams['sortType'] = [searchParams.get('sortType') as string];
    }
    if (searchParams.has('sortDirection')) {
      newParams['sortDirection'] = [searchParams.get('sortDirection') as string];
    }
    setSearchParams(newParams);
  };

  const changeCategoryClickHandler = (evt: React.MouseEvent<HTMLInputElement>) => { // radio-like behavior
    if ((evt.target as HTMLInputElement).value === (getValues('category'))[0]) {
      resetField('category');
      formChangeHandler(); // onChange event after reset
    } else {
      resetField('category');
      setValue('category', [(evt.target as HTMLInputElement).value]);
    }
  };

  const resetFiltersHandler = () => {
    reset();
    formChangeHandler(); // onChange event after reset
  };

  const getFieldsDisabledStatus = () => {
    const categoryField = watch('category');
    return categoryField ? categoryField[0] === FormFilter.category.videocamera : false;
  };

  useEffect(() => {
    for (const key in getValues()) {
      const value = searchParams.getAll(key);
      if (value) {
        setValue(key as keyof FiltersFormInputs, value);
      }
    }
  }, [getValues, searchParams, setValue]);


  return (
    <div className="catalog-filter">
      <form action="#" onChange={formChangeHandler}>
        <h2 className="visually-hidden">Фильтр</h2>
        <CatalogAsideFilterPrice control={control} formChangeHandler={formChangeHandler}/>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                value={FormFilter.category.photocamera}
                {...register('category')}
                onClick={changeCategoryClickHandler}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                value={FormFilter.category.videocamera}
                {...register('category')}
                onClick={changeCategoryClickHandler}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                defaultValue={FormFilter.type.digital}
                {...register('type')}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                defaultValue={FormFilter.type.film}
                {...register('type')}
                disabled={getFieldsDisabledStatus()}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                defaultValue={FormFilter.type.snapshot}
                {...register('type')}
                disabled={getFieldsDisabledStatus()}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                defaultValue={FormFilter.type.collection}
                {...register('type')}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                defaultValue={FormFilter.level.zero}
                {...register('level')}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                defaultValue={FormFilter.level.nonProfessional}
                {...register('level')}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                defaultValue={FormFilter.level.professional}
                {...register('level')}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={resetFiltersHandler}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

