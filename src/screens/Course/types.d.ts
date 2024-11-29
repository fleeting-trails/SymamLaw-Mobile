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
        open: boolean,
        setOpen: (open: boolean) => void,
        data: Store.CourseData
    }
    type CourseResources = CourseEnrolledMoreViews & {
        lecture: Store.CourseLecture
    }
}