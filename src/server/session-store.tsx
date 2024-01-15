function getRedisSessionId(sid) {
    return `ssid:${sid}`
}

class RedisSessionStore {
    constructor(client) {
        this.client = client
    }

    async get(sid) {
        console.log('get session from redis: ', sid)
        const id = getRedisSessionId(sid)
        const data = await this.client.get(id)
        if (!data) {
            return null
        }
        try {
            const result = JSON.parse(data)
            return result
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async set(sid, sess, ttl) {
        console.log('set session to redis: ', sid)
        const id = getRedisSessionId(sid)
        if (typeof ttl === 'number') {
            await this.client.set(id, JSON.stringify(sess), 'EX', ttl)
        } else {
            await this.client.set(id, JSON.stringify(sess))
        }
    }

    async destroy(sid) {
        console.log('destroy session from redis: ', sid)
        const id = getRedisSessionId(sid)
        await this.client.del(id)

    }
}

module.exports = RedisSessionStore
