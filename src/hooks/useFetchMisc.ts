import { useQueries } from "@tanstack/react-query";

type MiscDataItem = {
    id: string | number;
    name: string;
};

type MiscData = {
    projects: MiscDataItem[];
    reportingManagers: MiscDataItem[];
    divisions: MiscDataItem[];
    departments: MiscDataItem[];
    locations: MiscDataItem[];
    designations: MiscDataItem[];
    attendance: MiscDataItem[];
};

const fetchProjects = async (): Promise<MiscDataItem[]> => fetch(" /api/v2/misc/projects").then((res) => res.json());

const fetchReportingManagers = async (): Promise<MiscDataItem[]> => fetch(" /api/v2/misc/reporting-managers").then((res) => res.json());

const fetchDivisions = async (): Promise<MiscDataItem[]> => fetch(" /api/v2/misc/divisions").then((res) => res.json());

const fetchDepartments = async (): Promise<MiscDataItem[]> => fetch(" /api/v2/misc/departments").then((res) => res.json());

const fetchLocations = async (): Promise<MiscDataItem[]> => fetch(" /api/v2/misc/locations").then((res) => res.json());

const fetchDesignations = async (): Promise<MiscDataItem[]> => fetch(" /api/v2/misc/designations").then((res) => res.json());

const fetchAttendance = async (): Promise<MiscDataItem[]> => fetch(" /api/v2/misc/attendance").then((res) => res.json());

export function useMiscData() {
    const queries = useQueries({
        queries: [
            { queryKey: ["projects"], queryFn: fetchProjects },
            { queryKey: ["reportingManagers"], queryFn: fetchReportingManagers },
            { queryKey: ["divisions"], queryFn: fetchDivisions },
            { queryKey: ["departments"], queryFn: fetchDepartments },
            { queryKey: ["locations"], queryFn: fetchLocations },
            { queryKey: ["designations"], queryFn: fetchDesignations },
            { queryKey: ["attendance"], queryFn: fetchAttendance },
        ],
    });

    const [projectsQuery, reportingManagersQuery, divisionsQuery, departmentsQuery, locationsQuery, designationsQuery, attendanceQuery] = queries;

    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);

    const data: MiscData = {
        projects: projectsQuery.data || [],
        reportingManagers: reportingManagersQuery.data || [],
        divisions: divisionsQuery.data || [],
        departments: departmentsQuery.data || [],
        locations: locationsQuery.data || [],
        designations: designationsQuery.data || [],
        attendance: attendanceQuery.data || [],
    };

    return {
        data,
        isLoading,
        isError,
        refetch: {
            projects: projectsQuery.refetch,
            reportingManagers: reportingManagersQuery.refetch,
            divisions: divisionsQuery.refetch,
            departments: departmentsQuery.refetch,
            locations: locationsQuery.refetch,
            designations: designationsQuery.refetch,
            attendance: attendanceQuery.refetch,
        },
        isFetching: {
            projects: projectsQuery.isFetching,
            reportingManagers: reportingManagersQuery.isFetching,
            divisions: divisionsQuery.isFetching,
            departments: departmentsQuery.isFetching,
            locations: locationsQuery.isFetching,
            designations: designationsQuery.isFetching,
            attendance: attendanceQuery.isFetching,
        },
    };
}
