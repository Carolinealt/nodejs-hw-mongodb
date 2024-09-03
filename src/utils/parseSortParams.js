import { SORT_ORDER } from "../constants/index.js";

export const parseSortBy = (maybeSortBy) => {
    if (typeof maybeSortBy !== 'string') {
        return "name";
    }

    const keys = ["_id", "name", "createdAt", "updatedAt"];
    if (keys.includes(maybeSortBy)) {
        return maybeSortBy
    }

    return "name";
}

export const parseSortOrder = (maybeSortOrder) => {
    if (typeof maybeSortOrder !== 'string') {
        return SORT_ORDER.ASC;
    }

    const keys = [SORT_ORDER.ASC, SORT_ORDER.DESC];
    if (keys.includes(maybeSortOrder)) {
        return maybeSortOrder;
    }

    return SORT_ORDER.ASC;
}

export const parseSortParams = (query) => {
    const { sortBy, sortOrder } = query;

    const parsedSortBy = parseSortBy(sortBy);
    const parsedSortOrder = parseSortOrder(sortOrder)
    return { sortBy: parsedSortBy, sortOrder: parsedSortOrder };


}