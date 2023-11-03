# TODO

- [x] migrate to self hosted postgres
- [ ] change search function to not depend on huggingface api
  - Iterate through sentances using server side cursor
  - for an initial model (should be improved later):
    - compute embeddings of the words
    - check cosine similarity
    - return the top results above a threshold
- [ ] verify functionality of server
- [ ] fix icons on frontend
- [ ] fix buttons on the frontend
- [ ] dockerize and deploy frontend
