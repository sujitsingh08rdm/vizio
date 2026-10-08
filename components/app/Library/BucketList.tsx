import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const BucketList = () => {
  return (
    <Card className="bg-linear-to-r from-indigo-700 via-indigo-500 to-indigo-300 border-0">
      <CardHeader>
        <CardTitle className="text-lg text-white font-medium">
          Sujit's
        </CardTitle>
        <CardDescription className="text-white ">July 2, 2026</CardDescription>
        <CardAction>
          <Link href={`/app/library/${"Sujit's"}`}>
            <Button variant="outline">
              <ExternalLink />
              Explore
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default BucketList;
