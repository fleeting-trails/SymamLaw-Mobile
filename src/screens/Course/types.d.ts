namespace PropTypes {
    type CourseSingleScreen = {
        slug: string
    }
    type CourseSingleUnenrolled = {
        data: Store.CourseData
    }
    type CourseSingleEnrolled = {
        data: Store.CourseData
    }
    type CourseEnrolledMoreViews = {
        id: string,
        open: boolean,
        handleClose: () => void,
        data: Store.CourseData,
        lecture?: Store.CourseLecture
    }
    type CourseResources = CourseEnrolledMoreViews & {
        lecture?: Store.CourseLecture
    }
}