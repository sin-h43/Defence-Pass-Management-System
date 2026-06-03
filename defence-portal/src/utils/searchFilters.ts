export interface Visitor {
    id?:string;
    name?: string;
    status?:string;

    [key:string]:any;
}
/**
 * Filters an array of visitor records strictly by Visitor Name or ID string.
 * @param logs - The raw array of visitor data objects.
 * @param query - The search string input by the user.
 * @returns The filtered subset of visitors.
 */

export const filterByIdentityAndId = (logs: Visitor[], query: string):Visitor[]=>
{
    const sanitizedQuery = query?.toLocaleLowerCase().trim();
    if(!sanitizedQuery) return logs;

    return logs.filter((visitor:Visitor)=>{
        const matchesID = visitor.id?.toLocaleLowerCase().includes(sanitizedQuery);
        const matchesName = visitor.name?.toLocaleLowerCase().includes(sanitizedQuery);

        return !!(matchesID||matchesName);
    });
};     