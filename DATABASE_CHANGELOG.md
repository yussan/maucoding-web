# Changelog
All notable changes to this project will be documented in this file.

## 2019-07-25
### Updated
update posts structure, added one property `lang` , by default supported `ID` and `EN(default)`
```
db.getCollection('posts').update({}, {$set: {"lang": "en"}},false,true);
```