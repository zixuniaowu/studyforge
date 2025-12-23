#!/bin/bash
# Batch generate all YouTube videos for StudyForge
# Usage: ./generate_all_videos.sh

cd /home/zixuniaowu/dev/studyforge/backend
source venv/bin/activate

DATA_DIR="../web/public/sample-data"
OUTPUT_DIR="./output"

echo "============================================"
echo "StudyForge YouTube Video Batch Generator"
echo "============================================"
echo ""

# Function to generate video
generate_video() {
    local input=$1
    local output=$2
    local lang=$3
    local name=$4

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting: $name"
    python scripts/generate_youtube_video.py "$input" "$output" --language "$lang"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Completed: $name"
    echo ""
}

# Generate all videos
# Set 1
generate_video "$DATA_DIR/aws-aif-c01-set1.json" "$OUTPUT_DIR/aws-aif-c01-set1-zh.mp4" "zh" "Set1 Chinese"
generate_video "$DATA_DIR/aws-aif-c01-set1-ja.json" "$OUTPUT_DIR/aws-aif-c01-set1-ja.mp4" "ja" "Set1 Japanese"

# Set 2
generate_video "$DATA_DIR/aws-aif-c01-set2.json" "$OUTPUT_DIR/aws-aif-c01-set2-zh.mp4" "zh" "Set2 Chinese"
generate_video "$DATA_DIR/aws-aif-c01-set2-ja.json" "$OUTPUT_DIR/aws-aif-c01-set2-ja.mp4" "ja" "Set2 Japanese"

# Set 3
generate_video "$DATA_DIR/aws-aif-c01-set3.json" "$OUTPUT_DIR/aws-aif-c01-set3-zh.mp4" "zh" "Set3 Chinese"
generate_video "$DATA_DIR/aws-aif-c01-set3-ja.json" "$OUTPUT_DIR/aws-aif-c01-set3-ja.mp4" "ja" "Set3 Japanese"

echo "============================================"
echo "All videos generated!"
echo "============================================"
ls -lh "$OUTPUT_DIR"/*.mp4
