require 'rake'
require 'test/lib/jstest'

task :default => :test

desc "Runs all the JavaScript unit tests and collects the results"
JavaScriptTestTask.new(:test) do |t|
    testcases        = ENV['TESTCASES']
    tests_to_run     = ENV['TESTS']    && ENV['TESTS'].split(',')
    browsers_to_test = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
    tmp_dir          = "test/unit/tmp"

    t.mount("/src")
    t.mount("/test")

    Dir.mkdir(tmp_dir) unless File.exist?(tmp_dir)

    Dir["test/unit/*_test.js"].each do |file|
      TestBuilder.new(file).render
      test_file = File.basename(file, ".js")
      test_name = test_file.sub("_test", "")

      unless tests_to_run && !tests_to_run.include?(test_name)
        t.run("/#{tmp_dir}/#{test_file}.html", testcases)
      end
    end

    %w( firefox ).each do |browser|
      t.browser(browser.to_sym) unless browsers_to_test && !browsers_to_test.include?(browser)
    end
  end
