import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import GoogleProvider from "next-auth/providers/google"
import fetch from "node-fetch";

const spotifyScopes = ["user-top-read"].join(",")
const ytMusicScopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube',
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/youtube.force-ssl'
].join(' ')

const spotifyParams = {
    scope: spotifyScopes
}

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(spotifyParams).toString();

async function refreshAccessToken(token) {
    const params = new URLSearchParams()
    params.append("grant_type", "refresh_token")
    params.append("refresh_token", token.refreshToken)
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        body: params
    })
    const data = await response.json()
    return {
        ...token,
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires: Date.now() + data.expires_in * 1000
    }
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: ytMusicScopes,
                    access_type: "offline",
                    response_type: "code",
                    prompt: "consent"
                }
            },
            checks: ["pkce", "state"]
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.accessTokenExpires = account.expires_at
                token.provider = account.provider
                return token
            }
            // access token has not expired
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires * 1000) {
                return token
            }

            // access token has expired
            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            session.provider = token.provider
            return session
        }
    }
}

export default NextAuth(authOptions)