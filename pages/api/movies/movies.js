/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Returns movies
 *     responses:
 *       200:
 *         description: Hello Movies
 */
export default async function handler(req, res) {
  const movies = [
    { id: 1, title: 'Batman' },
    { id: 2, title: 'The Joker' },
  ];

  switch (req.method) {
    case 'GET':
      res.json({ status: 200, data: movies, method: 'GET' });
      break;

    case 'POST':
      res.json({ status: 200, data: movies, method: 'POST' });
      break;
  }

  res.json({ status: 200, data: movies });
}
