find dist/cdn/assets assets/common/t9n -type f -exec stat -f '%z %N' {} + |
awk '{
  split($2, path, "/");
  component = path[1] == "assets" ? path[2] : path[4];
  bytes[component] += $1;
  files[component]++;
}
END {
  for (component in bytes)
    printf "%-30s %3d files %10.2f KB\n", component, files[component], bytes[component] / 1024
}' | sort -k4nr