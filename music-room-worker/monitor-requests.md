# Request Monitoring

## Current Settings

- **Active polling**: 5 seconds (reduced from 3s)
- **Inactive polling**: 15 seconds
- **Heartbeat**: 20 seconds

## Request Calculation

### Per User Per Day:
```
Active polling: 86,400 seconds/day ÷ 5 seconds = 17,280 polls/day
Heartbeat: 86,400 seconds/day ÷ 20 seconds = 4,320 heartbeats/day
Actions (play/pause/add): ~100/day

Total per user: ~21,700 requests/day
```

### Multiple Users:
```
2 users:   43,400 requests/day   (43% of free tier) ✅
5 users:  108,500 requests/day   (108% - slightly over) ⚠️
10 users: 217,000 requests/day   (217% - need paid tier) ❌
```

## Free Tier Limit
- **100,000 requests/day** = FREE
- Above that: $5/month for 10M requests

## Cost Optimization Tips

### If approaching limit:
1. **Increase polling interval** to 10 seconds:
   - Reduces to ~8,640 polls/day per user
   - 10 users = ~108,000 requests/day (still in free tier!)

2. **Use conditional polling**:
   - Only poll when video is playing
   - Stop polling when paused

3. **Batch operations**:
   - Already implemented (heartbeat separate from polling)

## Monitor Usage

Check Cloudflare dashboard:
1. Go to https://dash.cloudflare.com
2. Workers & Pages
3. Click your worker
4. View metrics

## Current Status

With 5-second polling:
- ✅ 1-4 users: FREE
- ⚠️ 5-9 users: Approaching limit
- ❌ 10+ users: Need paid tier ($5/month)

**Recommendation**: Keep 5-second polling for good UX. If you get 10+ concurrent users, the $5/month is worth it!
