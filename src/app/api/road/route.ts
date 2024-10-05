/** Please use these types and modify them as needed. */

export async function GET() {
  const road: Road = {
    vehicles: [],
    observer: {
      width: 4,
      length: 10,
      position: {
        x: 15,
        y: 0,
      },
      direction: 1,
      fov: 178,
    },
    width: 80,
    length: 880,
  };

  return Response.json(road);
}
