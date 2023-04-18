//  -- transform(themes file path, tokensDir?: string) --
// read [themes] file at themes file path
  // create [fileName] from [theme].name
  // create workingObject
  // create a dictionary of [soruce, enabled] from selectedTokenSets
  // for source set
    // create global object
    // read each object from source set look for "value" or a value that is not an object
      // check for string starting with "$"
      // if true
        // [1]
      // add full object to global object
  // for each enabled set
    // read each object from enabled set look for "value" or a value that is not an object
      // check for string starting with "$"
      // if true
        // -- [1] lookupVariable(str:string, globals: Record<string, any>, { setGlobal: boolean; })
        // [1] lookupVariable from (global object)
          // if found
            // if variable also has a string starting with "$"
              // loop [1] lookupVariable(var, global object, setGlobal = false)
            // else
              // check loop prop "source"
                // if true
                  // replace string with variable value
                // else
                  // replace string starting with "$" to "{string}" (the SD var way)
              // check loop prop "setGlobal"
                // if true
                  // add variable to workingObject.global
          // else
            // throw an error
        
        // try [1] lookupVariable(string starting with "$", global object, { setGlobal: true })
        // catch error
            // [1] lookupVariable(string starting with "$", working object, { setGlobal: true })            
              // catch error
                // log an error informing the user the variable was not found
      // add each object from enabled set to workingObject
    // wait for all objects in enabled set to be read
    // save workingObject to temp/[fileName].temp.json
    // configure SD to use temp/[fileName].temp.json
    // should output expected final assets to outputPath/[fileName].[ext]





// calcite-transform config
  // input dir
  // output dir
  // themes
    // theme-file
    // theme-array-of-objects
      // name
      // selectedTokenSets
  // SD config customizations

// Read Theme Files
// Style Dictionary input [ ...(path)every file in selected token set ]

// register valueTransform
  // Convert Figma variables to SD variables

// register attributeTransform
  // find name in Object.keys(theme.selectedTokenSets)
  // if found
    // set attributes['tokenSet'] = theme.selectedTokenSets[name]
    // should be 'enabled', 'disabled', or 'source'

// register ts transforms

// register format


