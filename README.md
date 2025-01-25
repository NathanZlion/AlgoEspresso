# AlgoEspresso
Online Code Judging Platform like LeetCode, HackerRank, CodeSignal, etc.
Main Features:
- User can create an account and login
- User can browse problems
- User can submit code
- User can see the result of the code submission
- User can see the history of the code submission
---
- Super User can add problems
---
- Admin can see the list of users
- Admin can promote a user to Super User

## System Design
👉 Leave Comment on My System Design [link to system design](https://lucid.app/lucidspark/f55bd522-3a44-4f16-ae0d-f86f3409213f/edit?viewport_loc=-276%2C-1203%2C4235%2C2266%2C0_0&invitationId=inv_fc32bf96-59de-4be2-8361-83596d437ac6)

<!-- image -->
![System Design](Code%20Judging%20Platform%20(leetcode%20clone)%20-%20System%20Design.png)

## Tech Stack
- `Frontend`: React, Next.js, Clerk, Tailwind CSS, Shadcn UI.
- `Backend`: Go, Clerk SDK, Swagger.
- `Code Execution`: Docker, Go, Python, Java, C++, Node.js.
- `Cache`: Redis.
- `Database`: MongoDB.
- `Messaging` Queue: RabbitMQ for task distribution between workers.
- `Workers`: Go-based isolated code execution using Docker.
- `Infrastructure`: Kubernetes, Prometheus, Grafana.
