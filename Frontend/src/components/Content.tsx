import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";
import { Progress } from "./ui/progress";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardContent() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-4 sm:gap-x-9 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 mt-9 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card className="sm:col-span-2 md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Orders</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  View and manage all orders in the supply chain.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>View Orders</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">125</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={10} aria-label="10% increase" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">450</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +5% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={5} aria-label="5% increase" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Inventory</CardDescription>
                <CardTitle className="text-4xl">2,345</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +2% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={2} aria-label="2% increase" />
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="sm:col-span-2 md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Shipments</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Track and manage all shipments in the supply chain.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="bg-[#a405cc]">View Shipments</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">75</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +8% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={8} aria-label="8% increase" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">300</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +3% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={3} aria-label="3% increase" />
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
