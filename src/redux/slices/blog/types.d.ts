namespace Store {
    type Blog = {
        data: {
            posts: Array<BlogListData>;
            pagination: API.Pagination;
        },
        currentBlog: BlogData | null;
        loading: {
            fetchBlogs: boolean,
            fetchMoreBlogs: boolean,
            fetchBlogSingle: boolean,
            searchBlogs: boolean
        };
        error: any;
    }
    type BlogListData = {
        id: number
        title: string
        slug: string
        sub_title: string
        image: string
        author: string
        description: string
        date: string
        alter_txt: any
        meta_title?: string
        meta_description?: string
        meta_keywords: any
        og_image: string
        status: number
        created_at: string
        updated_at: string
    }
    type BlogData = BlogListData & {
        details: any
    }
}


