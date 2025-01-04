import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
  return (
    <div className="w-full space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content</p>
        </CardContent>
      </Card>
    </div>
  )
}
