/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import { CakeIcon} from '@heroicons/react/24/outline';
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'

import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
 
  {
    path: '/app/clients', // url
    icon: <UsersIcon className={iconClasses}/>, // icon component
    name: 'Clients', // name that appear in Sidebar
  },

  {
    path: '/app/foods', // url
    icon: <CakeIcon className={iconClasses}/>, // icon component
    name: 'Foods', // name that appear in Sidebar
  },

  {
    path: '/app/bookings',
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Booking',
  },

  {
    path: '/app/orders', // url
    icon: <DocumentTextIcon className={`${iconClasses} inline`}/>, // icon component
    name: 'Orders', // name that appear in Sidebar
  },
  {
    path: '/app/calendar', // url
    icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
    name: 'Calendar', // name that appear in Sidebar
  },
  
 

  
]

export default routes


