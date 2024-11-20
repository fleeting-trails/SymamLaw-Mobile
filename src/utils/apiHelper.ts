export function tailorPaginationResponse(
    responseData: API.ResponseBodyPaginated<any>,
  ): { data: any; pagination: API.Pagination } {
    return {
      data: responseData.data.data,
      pagination: {
        // This check in place because api inconsistatncy, some api returns pagination data inside meta while others don't
        current: responseData.data.meta?.current_page ?? (responseData.data as any).current_page,
        total: responseData.data.meta?.total ?? (responseData.data as any).total,
        totalPages: responseData.data.meta?.last_page ?? (responseData.data as any).last_page,
        pageSize: responseData.data.meta?.per_page ?? (responseData.data as any).per_page,
      },
    };
  }
  