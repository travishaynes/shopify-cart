$(document).ready ->
  # run the specs
  jasmine.getEnv().addReporter new jasmine.TrivialReporter()
  jasmine.getEnv().execute()
