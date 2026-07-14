import { useState, useEffect } from 'react'
import { useLocation as useRouterLocation } from 'react-router-dom'
import TodayPanchangam from '../components/Todaypanchangam'
import CalendarView from '../components/Calendar'
import Muhurtham from '../components/Muhurtham'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const location = useRouterLocation()

  // 如果从搜索跳转过来，使用传入的日期
  useEffect(() => {
    if (location.state?.date) {
      setSelectedDate(new Date(location.state.date))
    }
  }, [location.state])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title">Hindu Calendar</h1>
        <p className="section-subtitle">Navigate months and select any date for detailed Panchangam</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：日历 */}
        <div className="lg:col-span-2">
          <CalendarView selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </div>

        {/* 右侧：选中日期详情 */}
        <div className="space-y-6">
          <TodayPanchangam date={selectedDate} />
          <Muhurtham date={selectedDate} />
        </div>
      </div>
    </div>
  )
}