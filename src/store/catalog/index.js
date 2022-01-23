import StoreModule from "../module";
import qs from "qs";

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: "comma",
    encode: false,
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true,
  },
};

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
      },
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params = {}) {
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse(window.location.search) || {};
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params, ...validParams };
    // Установка параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Сброс параметров к начальным
   * @param params
   * @return {Promise<void>}
   */
  async resetParams(params = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = { ...this.initState().params };
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Загрузка списка товаров
   */
  async setParams(params = {}) {
    const newParams = { ...this.getState().params, ...params };

    this.setState({
      ...this.getState(),
      params: newParams,
    });

    const skip = (newParams.page - 1) * newParams.limit;
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
    });

    // Запоминаем параметры в URL
  }
}

export default CatalogStore;
