export function tailorPaginationResponse(
    responseData: API.ResponseBodyPaginated<any>,
  ): { data: any; pagination: API.Pagination } {
    return {
      data: responseData.data.data,
      pagination: {
        current: responseData.data.meta.current_page,
        total: responseData.data.meta.total,
        totalPages: responseData.data.meta.last_page,
        pageSize: responseData.data.meta.per_page,
      },
    };
  }
  