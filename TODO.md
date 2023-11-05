# TODO

- [x] migrate to self hosted postgres
- [x] change search function to not depend on huggingface api
  - Iterate through sentences using server side cursor
  - for an initial model (should be improved later):
    - compute embeddings of the words
    - check cosine similarity
    - return the top results above a threshold
- [x] verify functionality of server
- [x] fix icons on frontend
- [ ] fix buttons on the frontend
- [ ] fix search on the frontend
- [x] dockerize and deploy frontend
- [x] test memory usage of backend
