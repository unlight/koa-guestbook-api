# koa-guesbook-api

SETUP
---
1. Database connection string
```
setx TYPEORM_STORAGE "~db.sqlite"
```

SCRIPTS
---
| Command               | Description        |
|:----------------------|:-------------------|
| `npm run script:sync` | synchronize schema |

DEBUG
---
```
ts-node --inspect -F app/server
node --inspect-brk node_modules/ts-node/dist/_bin.js -F node_modules/mocha/bin/_mocha **/*.spec.ts
```

TODO
---
* create base strcuture (message id date inserted)
* script for update strcuture
* tags for message
* authorize (json web token)
* if user authorized track his message
* admin can delete
