const parseContactType = (maybeContactType) => {
    if (typeof maybeContactType !== 'string') {
        return undefined;
    }

    const keys = ["home", "personal"];
    if (keys.includes(maybeContactType)) {
        return maybeContactType
    }

    return undefined;
}

const parseIsFavourite = (maybeBoolean) => {
    if (typeof maybeBoolean === "undefined") {
        return undefined
    }
    const parsedBool = JSON.parse(maybeBoolean);

    return typeof parsedBool === "boolean" ? maybeBoolean : undefined;
}

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;
    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    return ({ contactType: parsedContactType, isFavourite: parsedIsFavourite });

}