import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOption } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOption(req, res),
  )

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return res.json({
    session,
  })
}
