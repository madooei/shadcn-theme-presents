import { CardsActivityGoal } from "../components/activity-goal";
import { CardsCalendar } from "../components/calendar";
import { CardsChat } from "../components/chat";
import { CardsCookieSettings } from "../components/cookie-settings";
import { CardsCreateAccount } from "../components/create-account";
import { CardsDataTable } from "../components/data-table";
import { CardsMetric } from "../components/metric";
import { CardsPaymentMethod } from "../components/payment-method";
import { CardsReportIssue } from "../components/report-issue";
import { CardsShare } from "../components/share";
import { CardsStats } from "../components/stats";
import { CardsTeamMembers } from "../components/team-members";

const CardsDemoPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
        <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
          <CardsStats />
          <div className="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
            <CardsCalendar />
            <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
              <CardsActivityGoal />
            </div>
            <div className="pt-3 sm:col-span-2 xl:pt-4">
              <CardsMetric />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="space-y-4 xl:space-y-4">
              <CardsTeamMembers />
              <CardsCookieSettings />
              <CardsPaymentMethod />
            </div>
            <div className="space-y-4 xl:space-y-4">
              <CardsChat />
              <CardsCreateAccount />
              <div className="hidden xl:block">
                <CardsReportIssue />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
          <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
            <CardsCalendar />
            <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
              <CardsActivityGoal />
            </div>
            <div className="pt-3 sm:col-span-2 xl:pt-3">
              <CardsMetric />
            </div>
          </div>
          <div className="hidden md:block">
            <CardsDataTable />
          </div>
          <CardsShare />
          <div className="xl:hidden">
            <CardsReportIssue />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsDemoPage;
