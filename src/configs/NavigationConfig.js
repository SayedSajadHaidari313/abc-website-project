import { DashboardOutlined, UserAddOutlined,MoneyCollectOutlined, ReadOutlined, TeamOutlined,PhoneOutlined, CommentOutlined, CreditCardOutlined ,ClockCircleOutlined,CalendarOutlined , DollarOutlined, WalletOutlined, SolutionOutlined, VideoCameraOutlined, TagsOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: true,
    isGroupTitle: true,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "sidenav.dashboard.default",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
  {
    key: "User Management",
    path: `${APP_PREFIX_PATH}/Users-List`,
    title: "sidenav.user_management",
    icon: UserAddOutlined,
    breadcrumb: true,
    isGroupTitle: false,
    submenu: [
      {
        key: "user",
        path: `${APP_PREFIX_PATH}/Users-List`,
        title: "sidenav.user",
        icon: UserAddOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "Instructor",
        path: `${APP_PREFIX_PATH}/Users-List/Instructor`,
        title: "sidenav.instructor",
        icon: ReadOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "Student",
        path: `${APP_PREFIX_PATH}/Users-List/Student`,
        title: "sidenav.student",
        icon: TeamOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },

{
  key: 'CourseManagement',
  path: `${APP_PREFIX_PATH}/CourseManagement`,
  title: 'sidenav.course_management',
  icon: SolutionOutlined,
  breadcrumb: true,
  isGroupTitle: false,
  submenu: [
    {
      key: 'Course-Category',
      path: `${APP_PREFIX_PATH}/Course-Category`,
      title: 'sidenav.course_category',
      icon:   TagsOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'Course-List',
      path: `${APP_PREFIX_PATH}/Course-List`,
      title: 'sidenav.course_list',
      icon:   ReadOutlined,
      breadcrumb: true,
      submenu: []
    },

    {
      key: 'Course-Session',
      path: `${APP_PREFIX_PATH}/Course-Session`,
      title: 'sidenav.course_session',
      icon:   VideoCameraOutlined,
      breadcrumb: true,
      submenu: []
    },

    {
      key: 'pricing',
      path: `${APP_PREFIX_PATH}/pricing`,
      title: 'sidenav.pricing',
      icon:  MoneyCollectOutlined,
      breadcrumb: true,
      submenu: []
    },
    // {
    //   key: 'Meeting',
    //   path: `${APP_PREFIX_PATH}/meeting`,
    //   title: 'sidenav.zoom-meeting',
    //   icon:   VideoCameraOutlined,
    //   breadcrumb: true,
    //   submenu: []
    // },

  ]
},
{
  key: "Payment Management",
  path: `${APP_PREFIX_PATH}/payments`,
  title: "sidenav.payment_management",
  icon: CreditCardOutlined ,
  breadcrumb: true,
  isGroupTitle: false,
  submenu: [
    {
      key: "payment_method",
      path: `${APP_PREFIX_PATH}/payment method`,
      title: "sidenav.payment_method",
      icon: DollarOutlined ,
      breadcrumb: true,
      submenu: [],
    },
    {
      key: "payment",
      path: `${APP_PREFIX_PATH}/payments`,
      title: "sidenav.payments",
      icon: WalletOutlined,
      breadcrumb: true,
      submenu: [],
    },
  ],
},
{
  key: "attendance",
  path: `${APP_PREFIX_PATH}/attendances`,
  title: "sidenav.attendance",
  icon: DashboardOutlined,
  breadcrumb: true,
  submenu: [
    {
      key: "attendancePage",
      path: `${APP_PREFIX_PATH}/attendances/attendanceSheet`,
      title: "sidenav.attendancePage",
      icon: ClockCircleOutlined ,
      breadcrumb: true,
      submenu: [],
    },
    {
      key: "attendanceToday",
      path: `${APP_PREFIX_PATH}/attendances/todayAttendance`,
      title: "sidenav.attendanceToday",
      icon: ClockCircleOutlined,
      breadcrumb: true,
      submenu: [],
    },
    {
      key: "attendanceHistory",
      path: `${APP_PREFIX_PATH}/attendances/historyAttendance`,
      title: "sidenav.attendanceHistory",
      icon: ClockCircleOutlined,
      breadcrumb: true,
      submenu: [],
    },
  ],
},
{
  key: "User Communications",
  path: `${APP_PREFIX_PATH}/contact`,
  title: "sidenav.user_communications",
  icon: CreditCardOutlined ,
  breadcrumb: true,
  isGroupTitle: false,
  submenu: [
    {
      key: "contact",
      path: `${APP_PREFIX_PATH}/contact`,
      title: "sidenav.contact",
      icon: PhoneOutlined ,
      breadcrumb: true,
      submenu: [],
    },
    {
      key: "feedback",
      path: `${APP_PREFIX_PATH}/feedback`,
      title: "sidenav.feedback",
      icon: CommentOutlined,
      breadcrumb: true,
      submenu: [],
    },
  ],
},
{
  key: "Exchange Rate Management",
  path: `${APP_PREFIX_PATH}/exchang_rate`,
  title: "sidenav.exchange_rate_management",
  icon: DollarOutlined  ,
  breadcrumb: true,
  isGroupTitle: false,
  submenu: [
    {
      key: "exchange-rate",
      path: `${APP_PREFIX_PATH}/exchange-rate`,
      title: "sidenav.exchange_rate",
      icon: DollarOutlined ,
      breadcrumb: true,
      submenu: [],
    },
  ],
}

];
const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
