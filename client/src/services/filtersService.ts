interface FilterOption {
    query: string,
}

type FilterItem = { name: string }

const filterByQuery = <T extends FilterItem>(query: string, data: T[]) : T[] => {
    const testQuery = new RegExp(query, "i");
    return data.filter((item) => testQuery.test(item.name));
}

export const applyFilters = <T extends FilterItem>(data: T[], options: FilterOption) => {
    const { query } = options;
    let filteredData = data;
    if (query) {
        filteredData = filterByQuery(query, filteredData);
    }
    return filteredData
}